/*
  Warnings:

  - You are about to drop the column `base64_image` on the `Person` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id_person" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_en" TEXT,
    "name_th" TEXT,
    "email" TEXT,
    "role_en" TEXT,
    "role_th" TEXT,
    "position_en" TEXT,
    "position_th" TEXT,
    "src_image" TEXT
);
INSERT INTO "new_Person" ("email", "id_person", "name_en", "name_th", "position_en", "position_th", "role_en", "role_th", "src_image") SELECT "email", "id_person", "name_en", "name_th", "position_en", "position_th", "role_en", "role_th", "src_image" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
