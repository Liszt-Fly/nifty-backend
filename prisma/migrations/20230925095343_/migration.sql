-- CreateTable
CREATE TABLE `verification` (
    `email` VARCHAR(191) NOT NULL,
    `verifyCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `verification_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
