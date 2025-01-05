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
        val user = (System.getenv("DEPLOYUSER") ?: "s409284")
        val userAndHost : String = user + "@" + (System.getenv ("DEPLOYHOST")  ?: "helios.cs.ifmo.ru")

        val pwd : String = System.getenv("DEPLOYPWD") ?: "neVZ>6891"

        println("$userAndHost :$pwd")

//        exec {
//            workingDir(".")
////            commandLine("pscp", "-pw", pwd, "-P", 2222, "${project.rootDir}/static_content/index.*", "${project.rootDir}/static_content/images/**", "$userAndHost:/home/studs/$user/www/")
//        }

        exec {
            workingDir(".")
            commandLine("pscp", "-pw", pwd, "-P", 2222, "${project.rootDir}/build/libs/**.jar", "$userAndHost:/home/studs/$user/web/httpd-root/fcgi-bin/")
        }

//        exec {
//            workingDir(".")
//            commandLine("pscp", "-pw", pwd, "-P", 2222, "${project.rootDir}/conf/**.conf", "$userAndHost:/home/studs/$user/httpd-root/conf/")
//        }
    }
}