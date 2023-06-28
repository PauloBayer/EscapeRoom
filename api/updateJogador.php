<?php

require 'connect.php';

// Get the posted data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data
    $request = json_decode($postdata);

    // Validate
    if (trim($request->data->login) === '') {
        return http_response_code(400);
    }

    // Sanitize
    $idJogador = mysqli_real_escape_string($conn, trim($request->data->idJogador));
    $login = mysqli_real_escape_string($conn, trim($request->data->login));
    $senha = mysqli_real_escape_string($conn, trim($request->data->senha));
    $idLiga = isset($request->data->idLiga) ? mysqli_real_escape_string($conn, trim($request->data->idLiga)) : 1;

    // Update
    $sql = "UPDATE `jogador` SET `login`='$login',`senha`='$senha',`idLiga`='$idLiga' WHERE `idJogador` = '{$idJogador}' LIMIT 1";

    if (mysqli_query($conn, $sql)) {
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
}

?>