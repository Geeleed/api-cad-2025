-- CreateTable
CREATE TABLE "ServiceTitle" (
    "id_service_title" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content_en" TEXT,
    "content_th" TEXT
);

-- CreateTable
CREATE TABLE "ServiceDetail" (
    "id_service_detail" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_service_title" INTEGER NOT NULL,
    "content_en" TEXT,
    "content_th" TEXT,
    CONSTRAINT "ServiceDetail_id_service_title_fkey" FOREIGN KEY ("id_service_title") REFERENCES "ServiceTitle" ("id_service_title") ON DELETE RESTRICT ON UPDATE CASCADE
);
