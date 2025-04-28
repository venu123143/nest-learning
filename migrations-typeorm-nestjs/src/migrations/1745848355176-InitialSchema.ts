import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1745848355176 implements MigrationInterface {
    name = 'InitialSchema1745848355176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_date" TIMESTAMP NOT NULL, "total_slots" integer NOT NULL, "available_slots" integer NOT NULL, "price" numeric(10,2) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'expired')`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" integer NOT NULL, "ticket_id" uuid NOT NULL, "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'pending', "booking_reference" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."queue_entries_status_enum" AS ENUM('waiting', 'processing', 'completed', 'abandoned')`);
        await queryRunner.query(`CREATE TABLE "queue_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" integer NOT NULL, "ticket_id" uuid NOT NULL, "position" integer NOT NULL, "status" "public"."queue_entries_status_enum" NOT NULL DEFAULT 'waiting', "joined_at" TIMESTAMP NOT NULL DEFAULT now(), "processed_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e533b14d1153fecfad7767bda5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_00f9bd9a9c5ee9826633415923" ON "queue_entries" ("ticket_id", "position") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_028343a1767697bd6ae7d4d2a61" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "queue_entries" ADD CONSTRAINT "FK_bbc57a65df9cb42da92c450951d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "queue_entries" ADD CONSTRAINT "FK_1eb1cd0a68bdac345db90c88174" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queue_entries" DROP CONSTRAINT "FK_1eb1cd0a68bdac345db90c88174"`);
        await queryRunner.query(`ALTER TABLE "queue_entries" DROP CONSTRAINT "FK_bbc57a65df9cb42da92c450951d"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_028343a1767697bd6ae7d4d2a61"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00f9bd9a9c5ee9826633415923"`);
        await queryRunner.query(`DROP TABLE "queue_entries"`);
        await queryRunner.query(`DROP TYPE "public"."queue_entries_status_enum"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
    }

}
