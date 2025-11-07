-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TeamUser" (
    "userId" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    PRIMARY KEY ("userId", "teamId"),
    CONSTRAINT "TeamUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TeamUser" ("active", "teamId", "userId") SELECT "active", "teamId", "userId" FROM "TeamUser";
DROP TABLE "TeamUser";
ALTER TABLE "new_TeamUser" RENAME TO "TeamUser";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
