<?php
    session_start();

    $idProduct = json_decode(file_get_contents("php://input"), true);

    // echo $idProduct

    include '../connect.php';

    $sql = "SELECT * FROM `product` WHERE `id` = '".$idProduct."';";
    $result = $con -> query($sql);

    if($result -> num_rows > 0) {
        $product = $result -> fetch_assoc();
    }

    $product['qty'] = 1;

    // print_r($product);

    $_SESSION['cart'][] = $product;

    if(isset($_SESSION['cart'])) {
        print_r($_SESSION['cart']);
    }


?>