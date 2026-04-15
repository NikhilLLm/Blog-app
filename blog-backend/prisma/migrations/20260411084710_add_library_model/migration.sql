-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryPost" (
    "libraryId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "note" TEXT,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LibraryPost_pkey" PRIMARY KEY ("libraryId","postId")
);

-- CreateIndex
CREATE INDEX "Library_ownerId_idx" ON "Library"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Library_ownerId_name_key" ON "Library"("ownerId", "name");

-- CreateIndex
CREATE INDEX "LibraryPost_postId_idx" ON "LibraryPost"("postId");

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryPost" ADD CONSTRAINT "LibraryPost_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryPost" ADD CONSTRAINT "LibraryPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
