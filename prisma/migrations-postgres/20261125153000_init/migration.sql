-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "test_table" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "test_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_kookh" (
    "id" SERIAL NOT NULL,
    "locale" VARCHAR(2) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(500) NOT NULL,
    "video_youtube" VARCHAR(500),

    CONSTRAINT "about_kookh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_pages" (
    "id" SERIAL NOT NULL,
    "locale" VARCHAR(2) NOT NULL,
    "hero_title" VARCHAR(255) NOT NULL,
    "hero_subtitle" VARCHAR(255) NOT NULL,
    "hero_description" TEXT NOT NULL,
    "hero_image" VARCHAR(500) NOT NULL,
    "about_eyebrow" VARCHAR(150) NOT NULL,
    "about_title" VARCHAR(255) NOT NULL,
    "about_description" TEXT NOT NULL,
    "about_video_url" VARCHAR(500) NOT NULL,
    "amenities_eyebrow" VARCHAR(150) NOT NULL,
    "amenities_title" VARCHAR(255) NOT NULL,
    "gallery_eyebrow" VARCHAR(150) NOT NULL,
    "gallery_title" VARCHAR(255) NOT NULL,
    "testimonials_eyebrow" VARCHAR(150) NOT NULL,
    "testimonials_title" VARCHAR(255) NOT NULL,
    "cta_title" VARCHAR(255) NOT NULL,
    "cta_description" TEXT NOT NULL,
    "cta_button_label" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_amenities" (
    "id" SERIAL NOT NULL,
    "home_page_id" INTEGER NOT NULL,
    "icon_key" VARCHAR(50) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "home_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_gallery_images" (
    "id" SERIAL NOT NULL,
    "home_page_id" INTEGER NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "alt" VARCHAR(255) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "home_gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_testimonials" (
    "id" SERIAL NOT NULL,
    "home_page_id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "home_testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_page_contents" (
    "id" SERIAL NOT NULL,
    "locale" VARCHAR(2) NOT NULL,
    "hero_title" VARCHAR(255) NOT NULL,
    "hero_image" VARCHAR(500) NOT NULL,
    "story_eyebrow" VARCHAR(150) NOT NULL,
    "story_title" VARCHAR(255) NOT NULL,
    "story_first" TEXT NOT NULL,
    "story_second" TEXT NOT NULL,
    "story_image" VARCHAR(500) NOT NULL,
    "story_image_alt" VARCHAR(255) NOT NULL,
    "values_title" VARCHAR(255) NOT NULL,
    "values" JSONB NOT NULL,
    "facilities_title" VARCHAR(255) NOT NULL,
    "facilities" JSONB NOT NULL,
    "policies_title" VARCHAR(255) NOT NULL,
    "policies" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_page_contents" (
    "id" SERIAL NOT NULL,
    "locale" VARCHAR(2) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "hero_image" VARCHAR(500) NOT NULL,
    "groups" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_page_contents" (
    "id" SERIAL NOT NULL,
    "locale" VARCHAR(2) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "hero_image" VARCHAR(500) NOT NULL,
    "form_title" VARCHAR(255) NOT NULL,
    "form_labels" JSONB NOT NULL,
    "contact_section_title" VARCHAR(255) NOT NULL,
    "map_title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" SERIAL NOT NULL,
    "locale" VARCHAR(2) NOT NULL,
    "site_name" VARCHAR(150) NOT NULL,
    "header_logo" VARCHAR(500) NOT NULL,
    "footer_logo" VARCHAR(500) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fax" VARCHAR(50) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "map_embed_url" TEXT NOT NULL,
    "instagram_url" VARCHAR(500) NOT NULL,
    "facebook_url" VARCHAR(500) NOT NULL,
    "x_url" VARCHAR(500) NOT NULL,
    "whatsapp_url" VARCHAR(500) NOT NULL,
    "footer_credit" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "check_in" DATE NOT NULL,
    "check_out" DATE NOT NULL,
    "guests" INTEGER NOT NULL,
    "nights" INTEGER NOT NULL,
    "price_per_night" INTEGER NOT NULL DEFAULT 100,
    "total_price" INTEGER NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'PENDING_PAYMENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "token_hash" CHAR(64) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "about_kookh_locale_key" ON "about_kookh"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "home_pages_locale_key" ON "home_pages"("locale");

-- CreateIndex
CREATE INDEX "home_amenities_home_page_id_sort_order_idx" ON "home_amenities"("home_page_id", "sort_order");

-- CreateIndex
CREATE INDEX "home_gallery_images_home_page_id_sort_order_idx" ON "home_gallery_images"("home_page_id", "sort_order");

-- CreateIndex
CREATE INDEX "home_testimonials_home_page_id_sort_order_idx" ON "home_testimonials"("home_page_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "about_page_contents_locale_key" ON "about_page_contents"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "faq_page_contents_locale_key" ON "faq_page_contents"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "contact_page_contents_locale_key" ON "contact_page_contents"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_locale_key" ON "site_settings"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE INDEX "bookings_check_in_check_out_idx" ON "bookings"("check_in", "check_out");

-- CreateIndex
CREATE INDEX "bookings_customer_id_idx" ON "bookings"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_hash_key" ON "sessions"("token_hash");

-- CreateIndex
CREATE INDEX "sessions_customer_id_idx" ON "sessions"("customer_id");

-- CreateIndex
CREATE INDEX "sessions_expires_at_idx" ON "sessions"("expires_at");

-- AddForeignKey
ALTER TABLE "home_amenities" ADD CONSTRAINT "home_amenities_home_page_id_fkey" FOREIGN KEY ("home_page_id") REFERENCES "home_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_gallery_images" ADD CONSTRAINT "home_gallery_images_home_page_id_fkey" FOREIGN KEY ("home_page_id") REFERENCES "home_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_testimonials" ADD CONSTRAINT "home_testimonials_home_page_id_fkey" FOREIGN KEY ("home_page_id") REFERENCES "home_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
