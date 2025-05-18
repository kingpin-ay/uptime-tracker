CREATE TYPE "public"."tiers" AS ENUM('free', 'paid');--> statement-breakpoint
CREATE TABLE "alerts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "alerts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"monitorId" integer,
	"triggeredAt" timestamp NOT NULL,
	"resolvedAt" timestamp,
	"acknowledgedAt" timestamp,
	"acknowledgmentNote" varchar(255),
	"type" varchar(255) NOT NULL,
	"details" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "checks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "checks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"monitorId" integer,
	"timestamp" timestamp NOT NULL,
	"statusCode" integer NOT NULL,
	"responseTimeMs" integer NOT NULL,
	"success" boolean NOT NULL,
	"errorMessage" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "monitors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monitors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"method" varchar(255) NOT NULL,
	"intervalMinutes" integer NOT NULL,
	"expectedStatusCodes" jsonb NOT NULL,
	"headers" jsonb NOT NULL,
	"pingUrl" varchar(255) NOT NULL,
	"expectedPingIntervalMinutes" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"monitorId" integer,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"passwordHash" varchar(255) NOT NULL,
	"githubId" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"free" "tiers" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_monitorId_monitors_id_fk" FOREIGN KEY ("monitorId") REFERENCES "public"."monitors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checks" ADD CONSTRAINT "checks_monitorId_monitors_id_fk" FOREIGN KEY ("monitorId") REFERENCES "public"."monitors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pings" ADD CONSTRAINT "pings_monitorId_monitors_id_fk" FOREIGN KEY ("monitorId") REFERENCES "public"."monitors"("id") ON DELETE no action ON UPDATE no action;