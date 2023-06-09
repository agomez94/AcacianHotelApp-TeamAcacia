<?php
// Include a library for working with CSV files. PHP doesn't have built-in support for it.
require 'parsecsv.lib.php';

// First, check if form data was submitted
if (isset($_POST['uname'], $_POST['psw'])) {
    $username = $_POST['uname'];
    $password = $_POST['psw'];

    // Check for password length
    if (strlen($password) < 8) {
        die("Password must be at least 8 characters long");
    }

    // Hash the password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Open the CSV file
    $csv = new parseCSV();
    $csv->auto('usnpas.csv');

    // Check if username already exists
    foreach ($csv->data as $user) {
        if ($user['username'] == $username) {
            die("Username already exists");
        }
    }

    // Add the new user
    $csv->data[] = ['username' => $username, 'password' => $passwordHash];

    // Save the CSV file
    $csv->save();

    // Redirect the user to the login page (or wherever you want)
    header("Location: login.html");
} else {
    // No form data was submitted. You can handle this error however you want.
    die("No data submitted");
}
?>
