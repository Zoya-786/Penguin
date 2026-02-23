#include <WiFi.h>
#include <HTTPClient.h>

// ───── WiFi ─────
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// ───── Firebase URL ─────
const char* FIREBASE_URL =
  "https://penguin-b5b79-default-rtdb.firebaseio.com";

// ───── Sensor Pins ─────
#define PIN_PH          34
#define PIN_TDS         35
#define PIN_TURBIDITY   32
#define PIN_TEMP        33
#define PIN_TANK        36

// ───── Locations (Option A Simulation) ─────
const char* locations[] = {
  "Overhead_Tank",
  "Kitchen_Tap",
  "Storage_Drum"
};
int currentLocation = 0;

// ───── Thresholds ─────
float PH_MIN = 6.5, PH_MAX = 8.5;
int   TDS_MAX = 500;
float TURB_MAX = 5.0;
float TEMP_MAX = 40.0;
float TANK_MIN = 20.0;

// ───── Helper: Send Data ─────
void putToFirebase(String path, String jsonBody) {
  HTTPClient http;
  String url = String(FIREBASE_URL) + path + ".json";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.PUT(jsonBody);
  http.end();
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Connecting WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
}

void loop() {

  const char* location = locations[currentLocation];
  currentLocation = (currentLocation + 1) % 3;

  // ───── Read & Scale ─────
  float ph = analogRead(PIN_PH) * 14.0 / 4095.0;
  int   tds = analogRead(PIN_TDS) * 1000.0 / 4095.0;
  float turb = analogRead(PIN_TURBIDITY) * 10.0 / 4095.0;
  float temp = analogRead(PIN_TEMP) * 50.0 / 4095.0;
  float tank = analogRead(PIN_TANK) * 100.0 / 4095.0;

  Serial.printf("[%s] pH=%.2f TDS=%d Turb=%.2f Temp=%.2f Tank=%.2f\n",
                location, ph, tds, turb, temp, tank);

  // ───── Build Water JSON ─────
  String waterJson = "{";
  waterJson += "\"location\":\"" + String(location) + "\",";
  waterJson += "\"ph\":" + String(ph,2) + ",";
  waterJson += "\"tds\":" + String(tds) + ",";
  waterJson += "\"turbidity\":" + String(turb,2) + ",";
  waterJson += "\"temperature\":" + String(temp,2) + ",";
  waterJson += "\"tankLevel\":" + String(tank,2) + ",";
  waterJson += "\"timestamp\":" + String(millis());
  waterJson += "}";

  putToFirebase("/water/" + String(location), waterJson);

  // ───── Alert Logic ─────
  String issue = "";

  if (ph < PH_MIN || ph > PH_MAX)
    issue += "pH out of range; ";
  if (tds > TDS_MAX)
    issue += "High TDS; ";
  if (turb > TURB_MAX)
    issue += "High Turbidity; ";
  if (temp > TEMP_MAX)
    issue += "High Temp; ";
  if (tank < TANK_MIN)
    issue += "Low Tank Level; ";

  if (issue.length() > 0) {
    String alertJson = "{";
    alertJson += "\"location\":\"" + String(location) + "\",";
    alertJson += "\"issue\":\"" + issue + "\",";
    alertJson += "\"timestamp\":" + String(millis());
    alertJson += "}";

    putToFirebase("/alerts/alert_" + String(millis()), alertJson);

    Serial.println("⚠ ALERT POSTED: " + issue);
  }

  delay(5000);
}