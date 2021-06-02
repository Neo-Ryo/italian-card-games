-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "avatar" TEXT,
    "wallet" INTEGER NOT NULL DEFAULT 0,
    "gameId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player.email_unique" ON "Player"("email");

-- AddForeignKey
ALTER TABLE "Player" ADD FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
