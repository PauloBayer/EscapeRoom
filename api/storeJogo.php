<?php

require 'connect.php';

// Get the posted data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data
    $request = json_decode($postdata);

    // Validate
    // if (trim($request->data->login) === '' || (int)$request->data->price < 1) {
    // if (trim($request->data->login) === '' || trim($request->data->senha) === '') {
    //     return http_response_code(400);
    // }

    // Sanitize
    $idJogo = mysqli_real_escape_string($conn, trim($request->data->idJogo));
    $idJogador = isset($request->data->idLiga) ? mysqli_real_escape_string($conn, trim($request->data->idJogador)) : 1;
    $pontos = mysqli_real_escape_string($conn, trim($request->data->pontos));
    $idLiga = isset($request->data->idLiga) ? mysqli_real_escape_string($conn, trim($request->data->idLiga)) : 1;
    
    // Store
    $sql = "INSERT INTO `jogo`(`idJogo`,`idLiga`,`idJogador`, `pontos`) VALUES ('{$idJogo}','{$idLiga}','{$idJogador}', '{$pontos}')";

    if (mysqli_query($conn, $sql)) {
        http_response_code(201);
        $jogo = [
            'idJogo' => $idJogo,
            'idLiga' => $idLiga,
            'idJogador' => $idJogador,
            'pontos' => $pontos,
        ];
        echo json_encode(['data'=>$jogo]);
    } else {
        http_response_code(422);
    }
}

?>