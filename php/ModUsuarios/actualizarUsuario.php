<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set("display_errors", 1);

include "../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$numeroControl = $data["numeroControl"];
$id_Rol = $data["id_Rol"];
$id_Estado = $data["id_Estado"];

// Actualiza Personas
$sql1 = $conn->prepare("
    UPDATE Personas
    SET id_Rol = ?, id_Estado = ?
    WHERE numeroControl = ?
");
$sql1->bind_param("iii", $id_Rol, $id_Estado, $numeroControl);

if (!$sql1->execute()) {
    echo json_encode([
        "mensaje" => "Error al actualizar Personas",
        "tipo" => "error"
    ]);
    exit;
}

// Actualiza Usuarios
$sql2 = $conn->prepare("
    UPDATE Usuarios
    SET id_Estado = ?
    WHERE numeroControl = ?
");
$sql2->bind_param("ii", $id_Estado, $numeroControl);
$sql2->execute();

echo json_encode([
    "mensaje" => "Usuario actualizado correctamente",
    "tipo" => "exito"
]);
?>
