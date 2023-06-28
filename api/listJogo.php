<?php

    /**
     * Returns the list of jogos
     */
    require 'connect.php';

    $jogos = [];
    $sql = "SELECT idJogo, idLiga, idJogador, pontos FROM jogo";
    
    if($result = mysqli_query($conn, $sql)) {
        $cr = 0;
        
        while($row = mysqli_fetch_assoc($result)) {
            $jogos[$cr]['idJogo'] = $row['idJogo'];
            $jogos[$cr]['idLiga'] = $row['idLiga'];
            $jogos[$cr]['idJogador'] = $row['idJogador'];
            $jogos[$cr]['pontos'] = $row['pontos'];
            $cr++;
        }

        echo json_encode(['data'=>$jogos]);
    } else {
        http_response_code(404);
    }

    // mysqli_close($conn);

?>