<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220822101742 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE history (id INT AUTO_INCREMENT NOT NULL, cooptation_id INT DEFAULT NULL, status_id INT DEFAULT NULL, date DATE NOT NULL, INDEX IDX_27BA704BCA700D5 (cooptation_id), INDEX IDX_27BA704B6BF700BD (status_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704BCA700D5 FOREIGN KEY (cooptation_id) REFERENCES cooptation (id)');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704B6BF700BD FOREIGN KEY (status_id) REFERENCES status (id)');
        $this->addSql('ALTER TABLE cooptation DROP FOREIGN KEY FK_60F616356BF700BD');
        $this->addSql('DROP INDEX IDX_60F616356BF700BD ON cooptation');
        $this->addSql('ALTER TABLE cooptation ADD date DATE NOT NULL, DROP status_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704BCA700D5');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704B6BF700BD');
        $this->addSql('DROP TABLE history');
        $this->addSql('ALTER TABLE cooptation ADD status_id INT DEFAULT NULL, DROP date');
        $this->addSql('ALTER TABLE cooptation ADD CONSTRAINT FK_60F616356BF700BD FOREIGN KEY (status_id) REFERENCES status (id)');
        $this->addSql('CREATE INDEX IDX_60F616356BF700BD ON cooptation (status_id)');
    }
}
