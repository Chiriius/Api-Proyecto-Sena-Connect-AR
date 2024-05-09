-- CreateTable
CREATE TABLE "marker" (
    "mar_id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "mar_name" TEXT NOT NULL,
    "mar_description" TEXT NOT NULL,

    CONSTRAINT "marker_pkey" PRIMARY KEY ("mar_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "marker_uid_key" ON "marker"("uid");
