void setup() {
  Serial.begin(9600);
  analogReference(DEFAULT);
}

void loop() {
  int analog0 = analogRead(A0);
  int analog1 = analogRead(A1);
  int analog2 = analogRead(A2);
  int analog3 = analogRead(A3);
  int analog4 = analogRead(A4);
  int analog5 = analogRead(A5);
  int analog6 = analogRead(A6);
  int analog7 = analogRead(A7);
  char buffer [100];
  int i=sprintf (buffer, "data:%u;%u;%u;%u;%u;%u;%u;%u;\r\n", analog0, analog1, analog2, analog3,analog4,analog5,analog6,analog7);
  for(int l=0; l<=i; l++) Serial.print(buffer[l]);
}
