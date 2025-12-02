/*
  Warnings:

  - You are about to drop the column `recurrenceException` on the `Event` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "location" TEXT,
    "type" TEXT NOT NULL DEFAULT 'OTHER',
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updatedAt" DATETIME,
    "recurrenceId" TEXT,
    "recurrenceRule" TEXT,
    "clubId" INTEGER NOT NULL,
    "teamId" INTEGER,
    CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Event_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("clubId", "createdAt", "createdBy", "description", "end", "id", "location", "recurrenceId", "recurrenceRule", "start", "teamId", "title", "type", "updatedAt", "updatedBy") SELECT "clubId", "createdAt", "createdBy", "description", "end", "id", "location", "recurrenceId", "recurrenceRule", "start", "teamId", "title", "type", "updatedAt", "updatedBy" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE INDEX "Event_recurrenceId_idx" ON "Event"("recurrenceId");
CREATE INDEX "Event_clubId_start_end_idx" ON "Event"("clubId", "start", "end");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
