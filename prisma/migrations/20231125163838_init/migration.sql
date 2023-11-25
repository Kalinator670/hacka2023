-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "creator" INTEGER NOT NULL,
    "image" TEXT,
    "start_at" TEXT NOT NULL,
    "end_at" TEXT NOT NULL,
    "registerStart_at" TEXT NOT NULL,
    "registerEnd_at" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToEvent" (
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserToEvent_user_id_event_id_key" ON "UserToEvent"("user_id", "event_id");

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
