CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `customer_id` INTEGER NOT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE NOT NULL,
  `guests` INTEGER NOT NULL,
  `nights` INTEGER NOT NULL,
  `price_per_night` INTEGER NOT NULL DEFAULT 100,
  `total_price` INTEGER NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'PENDING_PAYMENT',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  INDEX `bookings_check_in_check_out_idx`(`check_in`, `check_out`),
  INDEX `bookings_customer_id_idx`(`customer_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `bookings_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
