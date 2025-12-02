/*
  Warnings:

  - Made the column `categoryId` on table `CashFlow` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "CashFlowCategory_clubId_name_type_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CashFlow" (
    "id" BIGINT NOT NULL PRIMARY KEY,
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
