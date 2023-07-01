<?php

require 'connect.php';

// Get the posted data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data
    $request = json_decode($postdata);

    // Validate
    // if (trim($request->data->login) === '' || (int)$request->data->price < 1) {
    if (trim($request->data->nomeLiga) === '') {
        return http_response_code(400);
    }

    // Sanitize
    $nomeLiga = mysqli_real_escape_string($conn, trim($request->data->nomeLiga));
    $idLiga = mysqli_real_escape_string($conn, trim($request->data->idLiga));
    
    // Store
    $sql = "INSERT INTO `liga`(`nomeLiga`, `idLiga`) VALUES ('{$nomeLiga}', '{$idLiga}')";

    if (mysqli_query($conn, $sql)) {
        http_response_code(201);
        $liga = [
            'nomeLiga' => $nomeLiga,
        ];
        echo json_encode(['data'=>$liga]);
    } else {
        http_response_code(422);
    }
}

?>