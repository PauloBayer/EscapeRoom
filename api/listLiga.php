<?php

    /**
     * Returns the list of ligas
     */
    require 'connect.php';

    $ligas = [];
    $sql = "SELECT idLiga, nomeLiga FROM liga";
    
    if($result = mysqli_query($conn, $sql)) {
        $cr = 0;
        
        while($row = mysqli_fetch_assoc($result)) {
            $ligas[$cr]['idLiga'] = $row['idLiga'];
            $ligas[$cr]['nomeLiga'] = $row['nomeLiga'];
            $cr++;
        }

        echo json_encode(['data'=>$ligas]);
    } else {
        http_response_code(404);
    }

    // mysqli_close($conn);

?>