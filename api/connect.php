<?php 

    // db credentials
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', 'admin');
    define('DB_NAME', 'escapeRoom');

    // Connect with the database.
    function connect()
    {
        $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS);

        if (!$connect) {
            die("Failed to connect: " . mysqli_connect_error());
        }

        mysqli_set_charset($connect, "utf8");

        return $connect;
    }

    $conn = connect();

    // $conn = mysqli_connect("localhost", "root", "admin");
    // if (!$conn) {
    //     echo "Não foi possível conectar ao banco de dados: " . mysqli_connect_error();
    // }

    $sql = "CREATE DATABASE IF NOT EXISTS escapeRoom";
    if (mysqli_query($conn, $sql)) {
        // echo "Banco de dados criado com sucesso";
    } else {
        echo "Erro ao criar banco de dados: " . mysqli_error($conn);
    }

    mysqli_select_db($conn, DB_NAME);

    $sql = "CREATE TABLE IF NOT EXISTS `liga` (
        `idLiga` INT(11) NOT NULL AUTO_INCREMENT,
        `nomeLiga` VARCHAR(45) NOT NULL DEFAULT 'sem-nome',
        PRIMARY KEY (`idLiga`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    CREATE TABLE IF NOT EXISTS `jogador` (
        `idJogador` INT(11) NOT NULL AUTO_INCREMENT,
        `login` VARCHAR(45) NOT NULL,
        `senha` VARCHAR(45) NOT NULL,
        `idLiga` INT(11),
        PRIMARY KEY (`idJogador`),
        FOREIGN KEY (`idLiga`) REFERENCES `liga`(`idLiga`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    CREATE TABLE IF NOT EXISTS `jogo` (
        `idJogo` INT(11) NOT NULL AUTO_INCREMENT,
        `idLiga` INT(11),
        `idJogador` INT(11) NOT NULL,
        `pontos` INT(11) NOT NULL DEFAULT '0',
        PRIMARY KEY (`idJogo`),
        FOREIGN KEY (`idLiga`) REFERENCES `liga`(`idLiga`),
        FOREIGN KEY (`idJogador`) REFERENCES `jogador`(`idJogador`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    $queries = explode(';', $sql);

    foreach ($queries as $query) {
        if (trim($query) != '') {
            if (mysqli_query($conn, $query)) {
                // echo "Tabela criada com sucesso";
            } else {
                echo "Erro ao criar tabela: " . mysqli_error($conn);
            }
        }
    }

    // Checking if the admin was inputed
    $admin_inputed = false;
    
    $sql = "SELECT * FROM `liga` WHERE `idLiga` = '1' AND `nomeLiga` = 'Sem Liga'";
    $result = mysqli_query($conn, $sql);


    if (mysqli_num_rows($result) == 0) {
        $sql = "INSERT INTO `liga` (`idLiga`, `nomeLiga`) VALUES (1, 'Sem Liga');
          
                INSERT INTO `jogador` (`idJogador`, `login`, `senha`, `idLiga`) VALUES (1, 'admin', 'admin', 1);
          
                INSERT INTO `jogo` (`idJogo`, `idLiga`, `idJogador`, `pontos`) VALUES (1, 1, 1, 0);";  
    }

    $queries = explode(';', $sql);

    foreach ($queries as $query) {
        if (trim($query) != '') {
            if (mysqli_query($conn, $query)) {
                // echo "Tabela criada com sucesso";
            } else {
                echo "Erro ao criar tabela: " . mysqli_error($conn);
            }
        }
    };

    // if (mysqli_multi_query($conn, $sql)) {
    //     echo "Tabelas criadas com sucesso";
    // } else {
    //     echo "Erro ao criar tabelas: " . mysqli_error($conn);
    // }

    // mysqli_close($conn);

?>