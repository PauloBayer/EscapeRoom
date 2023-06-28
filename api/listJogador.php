<?php

    /**
     * Returns the list of jogadores
     */
    require 'connect.php';

    $jogadores = [];
    $sql = "SELECT idJogador, login, senha, idLiga FROM jogador";
    
    if($result = mysqli_query($conn, $sql)) {
        $cr = 0;
        
        while($row = mysqli_fetch_assoc($result)) {
            $jogadores[$cr]['idJogador'] = $row['idJogador'];
            $jogadores[$cr]['login'] = $row['login'];
            $jogadores[$cr]['senha'] = $row['senha'];
            $jogadores[$cr]['idLiga'] = $row['idLiga'];
            $cr++;
        }

        echo json_encode(['data'=>$jogadores]);
    } else {
        http_response_code(404);
    }

    // mysqli_close($conn);

?>