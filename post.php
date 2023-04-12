<?php
// Takes raw data from the request
$json = file_get_contents('php://input');

// If length of the json is longer than 1024, do not change the JSON file.
if(strlen($json) > 1024) {
  exit("not parsing data, data is over 1024 characters!");
}

// Converts it into a PHP object
// can be used later to read specific keys
$data = json_decode($json);

// open & write to file
$jsonFile = fopen("jsonInput.json", "w");
fwrite($jsonFile, $json . "\n");
fclose($jsonFile);

// Send back a response
if ($data) {
  echo "Data received: " . $json;
} else {
  echo "No data received or response error: " . http_response_code();
}
?>