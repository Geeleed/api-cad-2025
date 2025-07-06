/*
  Warnings:

  - Added the required column `element_type` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `element_type` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `element_type` to the `Highlight` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "id_credential" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "id_person" INTEGER NOT NULL,
    "element_type" TEXT NOT NULL,
    CONSTRAINT "Credential_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Credential" ("content", "id_credential", "id_person") SELECT "content", "id_credential", "id_person" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
CREATE TABLE "new_Education" (
    "id_education" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "id_person" INTEGER NOT NULL,
    "element_type" TEXT NOT NULL,
    CONSTRAINT "Education_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Education" ("content", "id_education", "id_person") SELECT "content", "id_education", "id_person" FROM "Education";
DROP TABLE "Education";
ALTER TABLE "new_Education" RENAME TO "Education";
CREATE TABLE "new_Highlight" (
    "id_highlight" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "id_person" INTEGER NOT NULL,
    "element_type" TEXT NOT NULL,
    CONSTRAINT "Highlight_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Highlight" ("content", "id_highlight", "id_person") SELECT "content", "id_highlight", "id_person" FROM "Highlight";
DROP TABLE "Highlight";
ALTER TABLE "new_Highlight" RENAME TO "Highlight";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
