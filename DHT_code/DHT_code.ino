#include <dummy.h>
#include "DHT.h"
#include <ArduinoJson.h>
#include <SPI.h>
#include <SD.h>

#define DHTPIN D1      // DHT11 data pin is connected to NodeMCU pin D1

// Uncomment one of the lines below for your DHT sensor type
#define DHTTYPE DHT11   // DHT 11
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

DHT dht(DHTPIN, DHTTYPE);

File dataFile;

void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.println("DHT11 test");

  dht.begin();
  
  // initialize the SD card
  Serial.print("Initializing SD card...");
  if (!SD.begin(4)) {
    Serial.println("SD card initialization failed!");
    return;
  }
  Serial.println("SD card initialization done.");
  
  // create or open the data file
  dataFile = SD.open("dht-data.json", FILE_WRITE);
  if (!dataFile) {
    Serial.println("Error opening data file!");
  } else {
    dataFile.close();
  }
}

void loop() {
  delay(2000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" *C");

  StaticJsonDocument<200> doc;
  doc["humidity"] = humidity;
  doc["temperature"] = temperature;
  
  // serialize the data to JSON and write to file
  dataFile = SD.open("dht-data.json", FILE_WRITE);
  if (!dataFile) {
    Serial.println("Error opening data file!");
  } else {
    serializeJson(doc, dataFile);
    dataFile.println();
    dataFile.close();
    Serial.println("Data saved to file!");
  }
}
