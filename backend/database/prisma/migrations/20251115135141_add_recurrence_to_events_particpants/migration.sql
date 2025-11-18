/*
  Warnings:

  - Added the required column `createdBy` to the `EventParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventParticipant" (
    "eventId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'MAYBE',
    "checkedIn" BOOLEAN NOT NULL DEFAULT false,
    "checkedInBy" TEXT,
    "checkedInAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT,

    PRIMARY KEY ("eventId", "userId"),
    CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EventParticipant" ("checkedIn", "eventId", "status", "updatedAt", "userId") SELECT "checkedIn", "eventId", "status", "updatedAt", "userId" FROM "EventParticipant";
DROP TABLE "EventParticipant";
ALTER TABLE "new_EventParticipant" RENAME TO "EventParticipant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
