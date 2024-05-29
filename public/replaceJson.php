<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $fileUrl = $_SERVER['DOCUMENT_ROOT'] . $input['fileUrl'];
    $newContent = json_encode($input['newContent'], JSON_PRETTY_PRINT);

    // Attempt to create the file if it doesn't exist or replace its contents if it does
    if (file_put_contents($fileUrl, $newContent) !== false) {
        echo json_encode(['success' => true, 'message' => 'File created or updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create or update the file']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}