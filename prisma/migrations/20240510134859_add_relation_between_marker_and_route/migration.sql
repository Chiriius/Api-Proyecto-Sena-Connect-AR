-- CreateTable
CREATE TABLE "route" (
    "rout_id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "rout_name" TEXT NOT NULL,
    "rout_image" TEXT NOT NULL,
    "rout_marker_fk" INTEGER NOT NULL,

    CONSTRAINT "route_pkey" PRIMARY KEY ("rout_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "route_uid_key" ON "route"("uid");

-- AddForeignKey
ALTER TABLE "route" ADD CONSTRAINT "route_rout_marker_fk_fkey" FOREIGN KEY ("rout_marker_fk") REFERENCES "marker"("mar_id") ON DELETE RESTRICT ON UPDATE CASCADE;
