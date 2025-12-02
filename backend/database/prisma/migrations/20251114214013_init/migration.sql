/*
  Warnings:

  - The primary key for the `CashFlow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `CashFlow` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CashFlow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "occurredAt" DATETIME NOT NULL,
    "clubId" INTEGER NOT NULL,
    "teamId" INTEGER,
    "categoryId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updatedAt" DATETIME,
    CONSTRAINT "CashFlow_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CashFlow_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CashFlow_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CashFlowCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CashFlow" ("amount", "categoryId", "clubId", "createdAt", "createdBy", "description", "id", "occurredAt", "teamId", "updatedAt", "updatedBy") SELECT "amount", "categoryId", "clubId", "createdAt", "createdBy", "description", "id", "occurredAt", "teamId", "updatedAt", "updatedBy" FROM "CashFlow";
DROP TABLE "CashFlow";
ALTER TABLE "new_CashFlow" RENAME TO "CashFlow";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
