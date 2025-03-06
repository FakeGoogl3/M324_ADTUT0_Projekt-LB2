# CI/CD & Projektumsetzung Checkliste

## Umsetzen eines CI-Prozesses (0-5 Punkte)

- [AJ/NL] **Workflows auf «self-hosted» Runner ausgeführt** (Mindestens 1 Runner pro Teammitglied) (0-1 Punkt)
- [x] **Linting in der Pipeline** (Falls dieser Prozess fehlschlägt, wird die Pipeline unterbrochen) (0-1 Punkt)
- [x] **Testing in der Pipeline** (Falls dieser Prozess fehlschlägt, wird die Pipeline unterbrochen) (0-1 Punkt)
- [x] **Build-Prozess in der Pipeline** (Falls dieser Prozess fehlschlägt, wird die Pipeline unterbrochen) (0-1 Punkt)
- [x] **Pipeline-Schritte werden im Build-Prozess des Docker-Images ausgeführt** (0-1 Punkt)

## Zusammenarbeit (0-3 Punkte)

- [x] **Projekt mit Kanban-Board und sinnvollen Spalten vorhanden** (0-1 Punkt)
- [x] **Für jede Anforderung wurde ein Issue angelegt** (0-1 Punkt)
- [x] **Issues wurden mit dem Kanban-Board verbunden, zugewiesen und korrekt in den Status überführt** (0-1 Punkt)

## Umsetzung von neuen Anforderungen (0-4 Punkte)

- [AJ] **Darkmode umgesetzt** (0-1 Punkt)
- [AJ] **Aktuell verbundene Benutzer werden im Frontend angezeigt** (0-1 Punkt)
- [NL] **„Schreibt gerade“ wird im Frontend angezeigt** (0-1 Punkt)
- [NL] **Backend stellt REST-Endpunkt `/healthcheck` für Monitoring bereit (Status 200/OK)** (0-1 Punkt)

## Branching Strategie (0-2 Punkte)

- [x] **Strategie eingehalten («master», «development» und mindestens 4 Feature-Branches)** (0-1 Punkt)
- [NL/AJ] **Merging über Pull Requests mit Code Review durch Teampartner durchgeführt** (0-1 Punkt)

## Umsetzung eines CD-Prozesses (0-2 Punkte) - needs Testing

- [x] **Docker-Image wird automatisch in der CI/CD-Pipeline auf Docker Hub hochgeladen** (0-1 Punkt)
- [x] **Code im «master»-Branch wird automatisch auf einem Kubernetes-Cluster deployt** (0-1 Punkt)

## Monitoring (0-2 Punkte)

- [NL] **Applikation wird über Uptime Kuma kontinuierlich geprüft und Monitoring dokumentiert** (0-1 Punkt)
- [NL] **Notifier konfiguriert, der bei Ausfall benachrichtigt und dokumentiert ist** (0-1 Punkt)

## Dokumentation & Erläuterungen (0-2 Punkte)

- [NL/AJ] **CI/CD-Prozess korrekt grafisch abgebildet und Teilstücke akkurat beschrieben** (0-1 Punkt)
- [x] **Angewendete Branching-Strategie korrekt grafisch dargestellt** (0-1 Punkt)
