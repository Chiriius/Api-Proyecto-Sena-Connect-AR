-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "rol" INTEGER NOT NULL,
    "fechanacimiento" TIMESTAMP(3),
    "fecharegistro" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_uid_key" ON "user"("uid");
