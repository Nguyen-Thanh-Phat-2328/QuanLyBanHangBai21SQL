<?php
    $idProduct = $_GET['id'];
    include 'connect.php';

    $sql = "DELETE FROM `product` WHERE `id` = '".$idProduct."';";
    if($result = $con -> query($sql)) {
        header('Location: my-product.php');
        exit();
    } else {
        echo "<h1>Xóa sản phẩm thất bại Click vào <a href='my-product.php'>đây</a> để về trang danh sách</h1>";
    }
?>