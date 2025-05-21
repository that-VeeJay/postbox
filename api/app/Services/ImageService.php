<?php

namespace App\Services;

class ImageService
{
    public function compressAndStore($file, $publicFolder, $quality = 50, $maxWidth = 1000, $maxHeight = 800)
    {
        $filename = uniqid('post_') . '.avif';
        $tempDir = storage_path('app/temp');
        $tempPath = $tempDir . '/' . $filename;
        $finalPath = public_path($publicFolder . '/' . $filename);

        if (!file_exists($tempDir)) mkdir($tempDir, 0755, true);
        if (!file_exists(public_path($publicFolder))) mkdir(public_path($publicFolder), 0755, true);

        $file->move($tempDir, $filename);
        $this->compressImage($tempPath, $finalPath, $quality, $maxWidth, $maxHeight);
        unlink($tempPath);

        return $publicFolder . '/' . $filename;
    }

    private function compressImage($sourcePath, $destinationPath, $quality, $maxWidth, $maxHeight)
    {
        $info = getimagesize($sourcePath);
        list($width, $height) = $info;
        $aspect = $width / $height;

        if ($width > $maxWidth || $height > $maxHeight) {
            if ($maxWidth / $maxHeight > $aspect) {
                $newWidth = (int)($maxHeight * $aspect);
                $newHeight = $maxHeight;
            } else {
                $newWidth = $maxWidth;
                $newHeight = (int)($maxWidth / $aspect);
            }
        } else {
            $newWidth = $width;
            $newHeight = $height;
        }

        switch ($info['mime']) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($sourcePath);
                break;
            case 'image/png':
                $image = imagecreatefrompng($sourcePath);
                break;
            case 'image/webp':
                $image = imagecreatefromwebp($sourcePath);
                break;
            default:
                throw new \Exception("Unsupported format: {$info['mime']}");
        }

        $newImage = imagecreatetruecolor($newWidth, $newHeight);
        imagealphablending($newImage, false);
        imagesavealpha($newImage, true);
        imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        if (function_exists('imageavif')) {
            imageavif($newImage, $destinationPath, $quality);
        } else {
            imagewebp($newImage, str_replace('.avif', '.webp', $destinationPath), $quality);
        }

        imagedestroy($image);
        imagedestroy($newImage);
    }
}
