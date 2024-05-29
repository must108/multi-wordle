-- CreateTable
CREATE TABLE "fiveletter" (
    "wordid" SERIAL NOT NULL,
    "words" VARCHAR(10),

    CONSTRAINT "fiveletter_pkey" PRIMARY KEY ("wordid")
);

-- CreateTable
CREATE TABLE "fourletter" (
    "wordid" SERIAL NOT NULL,
    "words" VARCHAR(10),

    CONSTRAINT "fourletter_pkey" PRIMARY KEY ("wordid")
);

-- CreateTable
CREATE TABLE "sixletter" (
    "wordid" SERIAL NOT NULL,
    "words" VARCHAR(10),

    CONSTRAINT "sixletter_pkey" PRIMARY KEY ("wordid")
);
