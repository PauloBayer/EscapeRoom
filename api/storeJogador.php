<?php

require 'connect.php';

// Get the posted data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data
    $request = json_decode($postdata);

    // Validate
    // if (trim($request->data->login) === '' || (int)$request->data->price < 1) {
    if (trim($request->data->login) === '' || trim($request->data->senha) === '') {
        return http_response_code(400);
    }

    // Sanitize
    $idJogador = mysqli_real_escape_string($conn, trim($request->data->idJogador));
    $login = mysqli_real_escape_string($conn, trim($request->data->login));
    $senha = mysqli_real_escape_string($conn, trim($request->data->senha));
    $idLiga = isset($request->data->idLiga) ? mysqli_real_escape_string($conn, trim($request->data->idLiga)) : 1;
    
    // Store
    $sql = "INSERT INTO `jogador`(`idJogador`,`login`,`senha`, `idLiga`) VALUES ('{$idJogador}','{$login}','{$senha}', '{$idLiga}')";

    if (mysqli_query($conn, $sql)) {
        http_response_code(201);
        $jogador = [
            'idJogador' => $idJogador,
            'login' => $login,
            'senha' => $senha,
            'idLiga' => $idLiga,
        ];
        echo json_encode(['data'=>$jogador]);
    } else {
        http_response_code(422);
    }
}

?>