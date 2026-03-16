<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);

  echo "<h2>Danke für deine Vorbestellung, $name!</h2>";
  echo "<p>Wir haben deine E-Mail-Adresse gespeichert: $email</p>";
}
?>
