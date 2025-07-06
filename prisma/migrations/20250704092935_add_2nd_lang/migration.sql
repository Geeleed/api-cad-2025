/*
  Warnings:

  - You are about to drop the column `content` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Highlight` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Person` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "id_credential" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content_en" TEXT,
    "content_th" TEXT,
    "id_person" INTEGER NOT NULL,
    "element_type" TEXT NOT NULL DEFAULT 'p',
    CONSTRAINT "Credential_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Credential" ("element_type", "id_credential", "id_person") SELECT "element_type", "id_credential", "id_person" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
CREATE TABLE "new_Education" (
    "id_education" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content_en" TEXT,
    "content_th" TEXT,
    "id_person" INTEGER NOT NULL,
    "element_type" TEXT NOT NULL DEFAULT 'p',
    CONSTRAINT "Education_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Education" ("element_type", "id_education", "id_person") SELECT "element_type", "id_education", "id_person" FROM "Education";
DROP TABLE "Education";
ALTER TABLE "new_Education" RENAME TO "Education";
CREATE TABLE "new_Highlight" (
    "id_highlight" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content_en" TEXT,
    "content_th" TEXT,
    "id_person" INTEGER NOT NULL,
    "element_type" TEXT NOT NULL DEFAULT 'p',
    CONSTRAINT "Highlight_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Highlight" ("element_type", "id_highlight", "id_person") SELECT "element_type", "id_highlight", "id_person" FROM "Highlight";
DROP TABLE "Highlight";
ALTER TABLE "new_Highlight" RENAME TO "Highlight";
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
INSERT INTO "new_Person" ("email", "id_person", "src_image") SELECT "email", "id_person", "src_image" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
