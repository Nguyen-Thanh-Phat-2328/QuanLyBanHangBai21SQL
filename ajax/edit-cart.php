<?php
    session_start();
    $data = json_decode(file_get_contents("php://input"), true);

    $idProduct = $data['idProduct'];
    $status = $data['status'];

    if(isset($_SESSION['cart'])) {
        $cart = $_SESSION['cart'];
        foreach ($cart as $key => $value) {
            if ($idProduct == $value['id']) {
                if($status == 'up') {
                    $_SESSION['cart'][$key]['qty'] = $value['qty'] + 1;
                } else if($status == 'down') {
                    $_SESSION['cart'][$key]['qty'] = $value['qty'] - 1;
                } else if($status == 'delete') {
                    unset($_SESSION['cart'][$key]);
                }
            }
        }
    }

    print_r($_SESSION['cart']);
?>