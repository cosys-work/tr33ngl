plugins {
  kotlin("jvm") version "1.5.21"
  kotlin("plugin.allopen") version "1.5.21"
  id("io.quarkus")
}

repositories {
  mavenCentral()
  mavenLocal()
}

val quarkusPlatformGroupId: String by project
val quarkusPlatformArtifactId: String by project
val quarkusPlatformVersion: String by project

dependencies {
  implementation(enforcedPlatform("${quarkusPlatformGroupId}:${quarkusPlatformArtifactId}:${quarkusPlatformVersion}"))
  implementation(enforcedPlatform("${quarkusPlatformGroupId}:quarkus-kogito-bom:${quarkusPlatformVersion}"))
  implementation("io.quarkus:quarkus-jsonb")
  implementation("io.quarkus:quarkus-oidc-client")
  implementation("org.kie.kogito:kogito-quarkus-decisions")
  implementation("org.kie.kogito:kogito-quarkus")
  implementation("io.quarkus:quarkus-keycloak-authorization")
  implementation("org.kie.kogito:kogito-quarkus-rules")
  implementation("io.quarkus:quarkus-opentelemetry-exporter-jaeger")
  implementation("io.quarkus:quarkus-jacoco")
  implementation("io.quarkus:quarkus-amazon-s3")
  implementation("io.quarkus:quarkus-spring-data-rest")
  implementation("io.quarkus:quarkus-opentelemetry")
  implementation("io.quarkus:quarkus-kotlin")
  implementation("io.quarkus:quarkus-hibernate-orm-panache")
  implementation("io.quarkus:quarkus-mailer")
  implementation("io.quarkus:quarkus-kafka-streams")
  implementation("io.quarkus:quarkus-reactive-pg-client")
  implementation("io.quarkus:quarkus-reactive-messaging-http")
  implementation("org.kie.kogito:kogito-quarkus-predictions")
  implementation("io.quarkus:quarkus-hibernate-reactive-panache")
  implementation("io.quarkus:quarkus-rest-client-jsonb")
  implementation("io.quarkus:quarkus-hibernate-orm-panache-kotlin")
  implementation("io.quarkus:quarkus-keycloak-admin-client")
  implementation("io.quarkus:quarkus-kafka-client")
  implementation("io.quarkus:quarkus-config-yaml")
  implementation("io.quarkus:quarkus-opentelemetry-exporter-otlp")
  implementation("io.quarkus:quarkus-logging-json")
  implementation("io.quarkus:quarkus-micrometer")
  implementation("io.quarkus:quarkus-hibernate-orm-rest-data-panache")
  implementation("io.quarkus:quarkus-vertx")
  implementation("io.quarkus:quarkus-jgit")
  implementation("io.quarkus:quarkus-quartz")
  implementation("io.quarkus:quarkus-vertx-web")
  implementation("io.quarkus:quarkus-oidc")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
  implementation("io.quarkus:quarkus-arc")
  testImplementation("io.quarkus:quarkus-junit5")
}

group = "work.cosys"
version = "1.0-SNAPSHOT"

java {
  sourceCompatibility = JavaVersion.VERSION_11
  targetCompatibility = JavaVersion.VERSION_11
}

allOpen {
  annotation("javax.ws.rs.Path")
  annotation("javax.enterprise.context.ApplicationScoped")
  annotation("io.quarkus.test.junit.QuarkusTest")
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
  kotlinOptions.jvmTarget = JavaVersion.VERSION_11.toString()
  kotlinOptions.javaParameters = true
}
