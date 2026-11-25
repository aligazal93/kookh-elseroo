-- CreateTable
CREATE TABLE `about_kookh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locale` VARCHAR(2) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `text` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(500) NOT NULL,
    `video_youtube` VARCHAR(500) NULL,

    UNIQUE INDEX `about_kookh_locale_key`(`locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
