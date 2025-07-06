-- CreateTable
CREATE TABLE "Person" (
    "id_person" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "src_image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id_highlight" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "id_person" INTEGER NOT NULL,
    CONSTRAINT "Highlight_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Credential" (
    "id_credential" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "id_person" INTEGER NOT NULL,
    CONSTRAINT "Credential_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Education" (
    "id_education" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "id_person" INTEGER NOT NULL,
    CONSTRAINT "Education_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "Person" ("id_person") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
