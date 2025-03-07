# CI/CD & Projektumsetzung Checkliste

## Umsetzen eines CI-Prozesses (0-5 Punkte) 5/5

- [x] **Workflows auf «self-hosted» Runner ausgeführt** (Mindestens 1 Runner pro Teammitglied) (0-1 Punkt)
- [x] **Linting in der Pipeline** (Falls dieser Prozess fehlschlägt, wird die Pipeline unterbrochen) (0-1 Punkt)
- [x] **Testing in der Pipeline** (Falls dieser Prozess fehlschlägt, wird die Pipeline unterbrochen) (0-1 Punkt)
- [x] **Build-Prozess in der Pipeline** (Falls dieser Prozess fehlschlägt, wird die Pipeline unterbrochen) (0-1 Punkt)
- [x] **Pipeline-Schritte werden im Build-Prozess des Docker-Images ausgeführt** (0-1 Punkt)

## Zusammenarbeit (0-3 Punkte) 3/3

- [x] **Projekt mit Kanban-Board und sinnvollen Spalten vorhanden** (0-1 Punkt)
- [x] **Für jede Anforderung wurde ein Issue angelegt** (0-1 Punkt)
- [x] **Issues wurden mit dem Kanban-Board verbunden, zugewiesen und korrekt in den Status überführt** (0-1 Punkt)

## Umsetzung von neuen Anforderungen (0-4 Punkte) 4/4

- [x] **Darkmode umgesetzt** (0-1 Punkt)
- [x] **Aktuell verbundene Benutzer werden im Frontend angezeigt** [AJ] (0-1 Punkt)
- [x] **„Schreibt gerade“ wird im Frontend angezeigt** (0-1 Punkt)
- [x] **Backend stellt REST-Endpunkt `/healthcheck` für Monitoring bereit (Status 200/OK)** (0-1 Punkt)

## Branching Strategie (0-2 Punkte) 2/2

- [x] **Strategie eingehalten («master», «development» und mindestens 4 Feature-Branches)** (0-1 Punkt)
- [x] **Merging über Pull Requests mit Code Review durch Teampartner durchgeführt** (0-1 Punkt)

## Umsetzung eines CD-Prozesses (0-2 Punkte) 2/2

- [x] **Docker-Image wird automatisch in der CI/CD-Pipeline auf Docker Hub hochgeladen** (0-1 Punkt)
- [x] **Code im «master»-Branch wird automatisch auf einem Kubernetes-Cluster deployt** (0-1 Punkt)

## Monitoring (0-2 Punkte) 2/2

- [x] **Applikation wird über Uptime Kuma kontinuierlich geprüft und Monitoring dokumentiert** (0-1 Punkt)
- [x] **Notifier konfiguriert, der bei Ausfall benachrichtigt und dokumentiert ist** (0-1 Punkt)

## Dokumentation & Erläuterungen (0-2 Punkte) 2/2

- [x] **CI/CD-Prozess korrekt grafisch abgebildet und Teilstücke akkurat beschrieben** (0-1 Punkt)
- [x] **Angewendete Branching-Strategie korrekt grafisch dargestellt** (0-1 Punkt)
