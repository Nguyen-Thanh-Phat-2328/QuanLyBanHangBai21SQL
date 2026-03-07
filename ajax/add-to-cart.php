<?php
    session_start();

    $idProduct = json_decode(file_get_contents("php://input"), true);

    // echo $idProduct

    include '../connect.php';

    $sql = "SELECT * FROM `product` WHERE `id` = '" . $idProduct . "';";
    $result = $con->query($sql);

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
    }

    $product['qty'] = 1;

    if(isset($_SESSION['cart'])) {
        $cart = $_SESSION['cart'];
        $isIssetProduct = false;
        foreach ($cart as $key => $value) {
            if ($idProduct == $value['id']) {
                $product['qty'] = $value['qty'] + 1;
                $_SESSION['cart'][$key] = $product;
                $isIssetProduct = true;
            }
        }
        if($isIssetProduct == false) {
            $_SESSION['cart'][] = $product;
        }
    } else {
        $_SESSION['cart'][] = $product;
    }

    // print_r($product);

    // if (isset($_SESSION['cart'])) {
    //     print_r($_SESSION['cart']);
    // }
