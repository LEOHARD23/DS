<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set("display_errors", 1);

include "../conexion.php";

// Consulta completa para tabla y combobox
$sql = "
SELECT 
    p.numeroControl,
    p.nombre,
    p.apellidoPaterno,
    p.id_Rol,
    p.id_Estado,
    r.nombre AS rol,
    e.nombre AS estado
FROM Personas p
JOIN Roles r ON p.id_Rol = r.id_Rol
JOIN Estados e ON p.id_Estado = e.id_Estado
ORDER BY p.numeroControl ASC
";

$result = $conn->query($sql);

$usuarios = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

echo json_encode($usuarios);
?>
