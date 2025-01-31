plugins {
    id("java")
}

group = "org.example"

repositories {
    mavenCentral()
}

dependencies {

    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar"))))
}


tasks.test {
    useJUnitPlatform()
}

tasks.withType<Jar> {
    manifest {
        attributes["Main-Class"] = "Main"
    }
    val dependencies = configurations
        .runtimeClasspath
        .get()
        .map(::zipTree) // OR .map { zipTree(it) }
    from(dependencies)
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

tasks.withType<JavaCompile> {
    options.compilerArgs.addAll(arrayOf("--release", "17"))
}

tasks.compileJava{
    options.encoding = "UTF-8"
}

tasks.javadoc {
    options.encoding = "UTF-8"
}

tasks.create("deploy") {

    dependsOn("jar")

    doLast {
        val user = (System.getenv("DEPLOYUSER") ?: "")
        val userAndHost : String = user + "@" + (System.getenv ("DEPLOYHOST")  ?: "server.ru")

        val pwd : String = System.getenv("DEPLOYPWD") ?: ""

        println("$userAndHost :$pwd")



        exec {
            workingDir(".")
            commandLine("pscp", "-pw", pwd, "-P", 2222, "${project.rootDir}/build/libs/**.jar", "$userAndHost:/home/studs/$user/web/httpd-root/fcgi-bin/")
        }


    }
}
