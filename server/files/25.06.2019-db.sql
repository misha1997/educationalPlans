-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 25 2019 г., 20:49
-- Версия сервера: 5.7.16
-- Версия PHP: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ep`
--

-- --------------------------------------------------------

--
-- Структура таблицы `audit`
--

CREATE TABLE `audit` (
  `audit_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `operation_type` varchar(100) NOT NULL,
  `data` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `cycles_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `credits` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`category_id`, `cycles_id`, `name`, `credits`) VALUES
(1, 1, '1.1 Обов\'язкові навчальні дисципліни', 50),
(2, 1, '1.2 Вибіркові навчальні дисципліни', 15),
(3, 2, '2.1 Обов\'язкові навчальні дисципліни', NULL),
(4, 2, '2.2. Вибіркові навчальні дисципліни', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `cycles`
--

CREATE TABLE `cycles` (
  `cycles_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cycles`
--

INSERT INTO `cycles` (`cycles_id`, `name`, `credits`) VALUES
(1, '1 ЦИКЛ ДИСЦИПЛІН ЗАГАЛЬНОЇ ПІДГОТОВКИ', 65),
(2, '2 ЦИКЛ ДИСЦИПЛІН ПРОФЕСІЙНОЇ ПІДГОТОВКИ', 160),
(3, '3 Цикл практичної підготовки', 10),
(4, '4 Атестація', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `subdivision_id` int(11) NOT NULL,
  `api_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `departments`
--

INSERT INTO `departments` (`department_id`, `subdivision_id`, `api_id`, `name`) VALUES
(116, 32, 14, 'Кафедра фізіології і патофізіології з курсом медичної біології'),
(117, 34, 21, 'Кафедра мовної підготовки іноземних громадян'),
(118, 34, 297, 'Кафедра журналістики та філології'),
(119, 32, 306, 'Кафедра інфекційних хвороб з епідеміологією'),
(120, 32, 331, 'Кафедра загальної хірургії, радіаційної медицини та фтизіатрії'),
(121, 32, 11, 'Кафедра біофізики, біохімії, фармакології та біомолекулярної інженерії'),
(122, 37, 292, 'Кафедра внутрішньої медицини післядипломної освіти'),
(123, 32, 18, 'Кафедра патологічної анатомії'),
(124, 44, 16, 'Кафедра конституційного права, теорії та історії держави і права'),
(125, 32, 1472, 'Кафедра стоматології'),
(126, 42, 605, 'Кафедра електронних приладів і автоматики КІ СумДУ'),
(127, 42, 606, 'Кафедра економіки і управління КІ СумДУ'),
(128, 45, 214, 'Кафедра електроніки та комп`ютерної техніки'),
(129, 45, 117, 'Кафедра електроніки, загальної та прикладної фізики'),
(130, 36, 334, 'Кафедра маркетингу та управління інноваційною діяльністю'),
(131, 37, 370, 'Кафедра сімейної медицини з курсом дерматовенерології'),
(132, 37, 318, 'Кафедра педіатрії'),
(133, 32, 480, 'Кафедра громадського здоров\'я'),
(134, 46, 232, 'Кафедра прикладного матеріалознавства і технології конструкційних матеріалів'),
(135, 39, 593, 'Кафедра економіки та управління ШІ СумДУ'),
(136, 42, 473, 'Кафедра фундаментальних та загальнонаукових дисциплін КІ СумДУ'),
(137, 39, 597, 'Кафедра системотехніки та інформаційних технологій ШІ СумДУ'),
(138, 39, 594, 'Кафедра хімічної технології високомолекулярних сполук ШІ СумДУ'),
(139, 32, 295, 'Кафедра акушерства та гінекології'),
(140, 32, 333, 'Кафедра нейрохірургії та неврології з курсами психіатрії, наркології, медичної психології, професійних хвороб, секцією ортопедії та травматології'),
(141, 32, 13, 'Кафедра хірургії та онкології'),
(142, 41, 658, 'Кафедра теоретичної і прикладної економіки'),
(143, 32, 184, 'Кафедра морфології'),
(144, 41, 659, 'Кафедра іноземних мов ННІ БТ'),
(145, 41, 661, 'Кафедра бухгалтерського обліку та оподаткування'),
(146, 41, 657, 'Кафедра економічної кібернетики'),
(147, 41, 656, 'Кафедра міжнародних економічних відносин'),
(148, 41, 655, 'Кафедра фінансів, банківської справи та страхування'),
(149, 44, 653, 'Кафедра міжнародного, європейського права та цивільно-правових дисциплін'),
(150, 44, 313, 'Кафедра кримінально-правових дисциплін та судочинства'),
(151, 36, 1584, 'Кафедра маркетингу'),
(152, 44, 433, 'Кафедра адміністративного, господарського права та фінансово-економічної безпеки'),
(153, 34, 1405, 'Кафедра філософії'),
(154, 34, 540, 'Кафедра психології, політології та соціокультурних технологій'),
(155, 34, 391, 'Кафедра германської філології'),
(156, 34, 5, 'Кафедра іноземних мов'),
(157, 36, 10, 'Кафедра фінансів і підприємництва'),
(158, 36, 235, 'Кафедра управління'),
(159, 36, 111, 'Кафедра економіки, підприємництва та бізнес-адміністрування'),
(160, 45, 66, 'Кафедра математичного аналізу і методів оптимізації'),
(161, 45, 118, 'Кафедра електроенергетики'),
(162, 45, 24, 'Кафедра наноелектроніки'),
(163, 45, 325, 'Кафедра прикладної математики та моделювання складних систем'),
(164, 45, 450, 'Кафедра комп`ютерних наук'),
(165, 46, 229, 'Кафедра загальної механіки та динаміки машин'),
(166, 46, 129, 'Кафедра теоретичної та прикладної хімії'),
(167, 46, 386, 'Кафедра технології машинобудування, верстатів та інструментів'),
(168, 46, 244, 'Кафедра процесів та обладнання хімічних і нафтопереробних виробництв'),
(169, 46, 74, 'Кафедра прикладної гідроаеромеханіки'),
(170, 46, 49, 'Кафедра прикладної екології'),
(171, 46, 246, 'Кафедра технічної теплофізики');

-- --------------------------------------------------------

--
-- Структура таблицы `distribution_of_hours`
--

CREATE TABLE `distribution_of_hours` (
  `distribution_of_hours_id` int(11) NOT NULL,
  `education_item_id` int(11) NOT NULL,
  `module_number` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `form_control` varchar(100) NOT NULL,
  `individual_tasks` varchar(100) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `distribution_of_hours`
--

INSERT INTO `distribution_of_hours` (`distribution_of_hours_id`, `education_item_id`, `module_number`, `value`, `form_control`, `individual_tasks`, `semester`) VALUES
(201, 44, 1, 5, 'credit', 'сontrolwork', 1),
(202, 44, 2, 1, '', 'сontrolwork', 1),
(203, 44, 5, 3, 'credit', 'сontrolwork', 3),
(205, 45, 1, 4, 'credit', 'сontrolwork', 1),
(206, 45, 2, 5, 'credit', '', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `education_items`
--

CREATE TABLE `education_items` (
  `education_item_id` int(11) NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `cycles_id` int(11) DEFAULT NULL,
  `education_plans_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `credits` int(11) NOT NULL,
  `lectures` int(11) DEFAULT '0',
  `laboratories` int(11) DEFAULT '0',
  `choice` tinyint(1) NOT NULL DEFAULT '0',
  `fixed` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `education_items`
--

INSERT INTO `education_items` (`education_item_id`, `sub_category_id`, `category_id`, `cycles_id`, `education_plans_id`, `subject_id`, `credits`, `lectures`, `laboratories`, `choice`, `fixed`) VALUES
(44, NULL, 1, 1, 26, 1, 5, 0, 0, 0, 1),
(45, NULL, 1, 1, 26, 2, 5, 10, 5, 0, 1),
(46, NULL, 2, 1, 26, 1, 5, 0, 0, 0, 1),
(47, NULL, 1, 1, 26, 3, 5, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `education_plans`
--

CREATE TABLE `education_plans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'created',
  `year` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `qualification` varchar(20) DEFAULT NULL,
  `discipline` varchar(50) DEFAULT NULL,
  `specialty` varchar(50) DEFAULT NULL,
  `specialization` varchar(50) DEFAULT NULL,
  `educational_program` varchar(50) DEFAULT NULL,
  `educational_level` varchar(50) DEFAULT NULL,
  `form_study` varchar(50) DEFAULT NULL,
  `training_period` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `education_plans`
--

INSERT INTO `education_plans` (`id`, `user_id`, `department_id`, `name`, `status`, `year`, `created_at`, `qualification`, `discipline`, `specialty`, `specialization`, `educational_program`, `educational_level`, `form_study`, `training_period`) VALUES
(26, 12, 128, 'План', 'created', 2019, '2019-06-24 19:44:15', 'Бакалавр', 'віві', 'віві', 'віві', 'віві', 'віві', 'івві', '2 роки 10 місяців'),
(27, 12, 116, 'План 2', 'created', 2019, '2019-06-24 19:44:40', 'Бакалавр', 'віві', 'віві', 'віві', 'віві', 'віві', 'віві', '12'),
(29, 15, 128, 'План - клон 2', 'cloned', 2019, '2019-06-24 19:46:46', 'Бакалавр', 'віві', 'віві', 'віві', 'віві', 'віві', 'івві', '12');

-- --------------------------------------------------------

--
-- Структура таблицы `plan_controls`
--

CREATE TABLE `plan_controls` (
  `control_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `module_number` int(11) DEFAULT NULL,
  `hours_week` int(11) NOT NULL DEFAULT '0',
  `exams` int(11) NOT NULL DEFAULT '0',
  `credit` int(11) NOT NULL DEFAULT '0',
  `course_work` int(11) NOT NULL DEFAULT '0',
  `сontrol_work` int(11) NOT NULL DEFAULT '0',
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `plan_controls`
--

INSERT INTO `plan_controls` (`control_id`, `id`, `module_number`, `hours_week`, `exams`, `credit`, `course_work`, `сontrol_work`, `semester`) VALUES
(641, 26, 1, 0, 0, 0, 0, 1, 1),
(642, 26, 2, 0, 0, 0, 0, 2, 1),
(643, 26, 3, 0, 0, 0, 0, 0, 2),
(644, 26, 4, 0, 0, 0, 0, 0, 2),
(645, 26, 5, 0, 0, 0, 0, 0, 3),
(646, 26, 6, 0, 0, 0, 0, 0, 3),
(647, 26, 7, 0, 0, 0, 0, 0, 4),
(648, 26, 8, 0, 0, 0, 0, 0, 4),
(649, 26, 9, 0, 0, 0, 0, 0, 5),
(650, 26, 10, 0, 0, 0, 0, 0, 5),
(651, 26, 11, 0, 0, 0, 0, 0, 6),
(652, 26, 12, 0, 0, 0, 0, 0, 6),
(653, 26, 13, 0, 0, 0, 0, 0, 7),
(654, 26, 14, 0, 0, 0, 0, 0, 7),
(655, 26, 15, 0, 0, 0, 0, 0, 8),
(656, 26, 16, 0, 0, 0, 0, 0, 8);

-- --------------------------------------------------------

--
-- Структура таблицы `subdivisions`
--

CREATE TABLE `subdivisions` (
  `subdivision_id` int(11) NOT NULL,
  `api_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `subdivisions`
--

INSERT INTO `subdivisions` (`subdivision_id`, `api_id`, `name`) VALUES
(32, 340, 'Медичний факультет'),
(33, 1150, 'Науково-дослідний інститут економіки розвитку'),
(34, 341, 'Факультет іноземної філології та соціальних комунікацій'),
(35, 1571, 'Науково-дослідний інститут мінеральних добрив і пігментів СумДУ'),
(36, 338, 'Навчально-науковий інститут фінансів, економіки та менеджменту імені Олега Балацького'),
(37, 382, 'Факультет післядипломної медичної освіти'),
(38, 314, 'Машинобудівний коледж СумДУ'),
(39, 345, 'Шосткинський інститут СумДУ'),
(40, 383, 'Медичний інститут'),
(41, 665, 'Навчально-науковий інститут бізнес-технологій \"УАБС\"'),
(42, 329, 'Конотопський інститут СумДУ'),
(43, 349, 'Хіміко-технологічний коледж ім. І. Кожедуба ШІ СумДУ'),
(44, 437, 'Навчально-науковий інститут права'),
(45, 414, 'Факультет електроніки та інформаційних технологій'),
(46, 335, 'Факультет технічних систем та енергоефективних технологій');

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `subjects`
--

INSERT INTO `subjects` (`subject_id`, `name`) VALUES
(1, 'Іноземна мова'),
(2, 'Українознавство з комунікативним курсом української мови'),
(3, 'Філософія'),
(4, 'Фізичне виховання'),
(5, 'Вибіркові дисципліни гуманітарного спрямування (додаток 1)'),
(6, 'Вибіркові дисципліни інших спеціальностей  (додаток 2)'),
(7, 'Практика'),
(8, 'Кваліфікаційна робота бакалавра'),
(9, 'Атестаційний кваліфікаційний іспит'),
(10, 'Вибіркові дисципліни за спеціальністю');

-- --------------------------------------------------------

--
-- Структура таблицы `sub_categories`
--

CREATE TABLE `sub_categories` (
  `sub_category_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `credits` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sub_categories`
--

INSERT INTO `sub_categories` (`sub_category_id`, `category_id`, `name`, `credits`) VALUES
(1, 3, '2.1.1 Обов’язкові навчальні дисципліни за спеціальністю', 55),
(2, 3, '2.1.2 Обов\'язкові навчальні дисципліни за освітньою програмою', 60),
(3, 4, '2.2.1 Вибіркові навчальні дисципліни за спецальністю', 10),
(4, 4, '2.2.2 Вибіркові навчальні дисципліни за освітньою програмою', 35);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `name`, `surname`, `role`, `department_id`) VALUES
(12, 'misha@gmail.com', '$2b$08$JlpNKre8DSnafzG5yJZUnuk0nnCU2Uesa0tBN.9qCLijTzJx77/Hy', 'Міша', 'Отрощенко', 'admin', NULL),
(13, 'test@i.ua', '$2b$08$c4/34qBXy5nPXsEsKeHD0OgWjbSo3RzkhiTfUqv17QQMG8Wssx7Zm', 'Представник 2', 'Кафедри', 'repres_depart', 128),
(14, 'test2@gmail.com', '$2b$08$2mvL2eMPASxlD.79Gtd8L.uBOvQGStpMpp2JlYoT7eGQe0Acc5rLu', 'Представник', 'ОМУ', 'repres_omu', 128),
(15, 'aa@i.ua', '$2b$08$AV3tLCSVeBwK3aclzN8aeeTqG6BaRFQgg6glDyXM8HwM0gJEXap8i', 'Тест', 'Тест', 'repres_depart', 128);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `audit`
--
ALTER TABLE `audit`
  ADD PRIMARY KEY (`audit_id`),
  ADD KEY `fk_audit_users1_idx` (`user_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `fk_category_cycles_idx` (`cycles_id`) USING BTREE;

--
-- Индексы таблицы `cycles`
--
ALTER TABLE `cycles`
  ADD PRIMARY KEY (`cycles_id`);

--
-- Индексы таблицы `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD KEY `fk_departments_subdivisions1_idx` (`subdivision_id`);

--
-- Индексы таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  ADD PRIMARY KEY (`distribution_of_hours_id`),
  ADD UNIQUE KEY `field_uniquire` (`module_number`,`education_item_id`),
  ADD KEY `fk_distribution_of_hours_education_items2_idx` (`education_item_id`);

--
-- Индексы таблицы `education_items`
--
ALTER TABLE `education_items`
  ADD PRIMARY KEY (`education_item_id`),
  ADD KEY `fk_education_items_sub_categories1_idx` (`sub_category_id`),
  ADD KEY `fk_education_items_education_plans1_idx` (`education_plans_id`),
  ADD KEY `fk_education_items_subjects1_idx` (`subject_id`),
  ADD KEY `fk_education_items_categories1_idx` (`category_id`) USING BTREE,
  ADD KEY `fk_education_items_cycles1_idx` (`cycles_id`) USING BTREE;

--
-- Индексы таблицы `education_plans`
--
ALTER TABLE `education_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_education_plans_departments1_idx` (`department_id`),
  ADD KEY `fk_education_plans_users1_idx` (`user_id`);

--
-- Индексы таблицы `plan_controls`
--
ALTER TABLE `plan_controls`
  ADD PRIMARY KEY (`control_id`),
  ADD KEY `fk_education_plans1_idx` (`id`) USING BTREE;

--
-- Индексы таблицы `subdivisions`
--
ALTER TABLE `subdivisions`
  ADD PRIMARY KEY (`subdivision_id`);

--
-- Индексы таблицы `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- Индексы таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`sub_category_id`),
  ADD KEY `fk_sub_category_category1_idx` (`category_id`) USING BTREE;

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_users_departments1_idx` (`department_id`) USING BTREE;

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `audit`
--
ALTER TABLE `audit`
  MODIFY `audit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `cycles`
--
ALTER TABLE `cycles`
  MODIFY `cycles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT для таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  MODIFY `distribution_of_hours_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT для таблицы `education_items`
--
ALTER TABLE `education_items`
  MODIFY `education_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT для таблицы `education_plans`
--
ALTER TABLE `education_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `plan_controls`
--
ALTER TABLE `plan_controls`
  MODIFY `control_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=657;

--
-- AUTO_INCREMENT для таблицы `subdivisions`
--
ALTER TABLE `subdivisions`
  MODIFY `subdivision_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT для таблицы `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `audit`
--
ALTER TABLE `audit`
  ADD CONSTRAINT `fk_audit_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_category_cycles` FOREIGN KEY (`cycles_id`) REFERENCES `cycles` (`cycles_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_departments_subdivisions1` FOREIGN KEY (`subdivision_id`) REFERENCES `subdivisions` (`subdivision_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  ADD CONSTRAINT `fk_distribution_of_hours_education_items2` FOREIGN KEY (`education_item_id`) REFERENCES `education_items` (`education_item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `education_items`
--
ALTER TABLE `education_items`
  ADD CONSTRAINT `fk_education_items_categories1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_cycles1` FOREIGN KEY (`cycles_id`) REFERENCES `cycles` (`cycles_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_education_plans1` FOREIGN KEY (`education_plans_id`) REFERENCES `education_plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_sub_categories1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`sub_category_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_subjects1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `education_plans`
--
ALTER TABLE `education_plans`
  ADD CONSTRAINT `fk_education_plans_departments1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_plans_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `plan_controls`
--
ALTER TABLE `plan_controls`
  ADD CONSTRAINT `fk_education_plans1` FOREIGN KEY (`id`) REFERENCES `education_plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `fk_sub_category_category1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_departments1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
