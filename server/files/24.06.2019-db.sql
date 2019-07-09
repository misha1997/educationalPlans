-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 24 2019 г., 12:02
-- Версия сервера: 10.3.13-MariaDB
-- Версия PHP: 7.1.22

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
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
(1, 1, 0, 'КН'),
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
(171, 46, 246, 'Кафедра технічної теплофізики'),
(172, 1, 387, 'Кафедра військової підготовки');

-- --------------------------------------------------------

--
-- Структура таблицы `distribution_of_controls`
--

CREATE TABLE `distribution_of_controls` (
  `distribution_of_controls_id` int(11) NOT NULL,
  `education_item_id` int(11) NOT NULL,
  `exams` varchar(50) DEFAULT NULL,
  `credit` varchar(50) DEFAULT NULL,
  `individual_tasks` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(144, 28, 1, 3, '', '', 1),
(145, 28, 2, 3, '', '', 1),
(146, 28, 3, 3, 'no-certif', 'сoursework', 2),
(147, 30, 1, 2, '', '', 1),
(148, 30, 3, 2, 'no-certif', 'сoursework', 2),
(149, 31, 1, 3, '', '', 1),
(150, 31, 2, 3, '', '', 1),
(151, 31, 3, 3, 'no-certif', 'сoursework', 2),
(152, 30, 2, 2, '', '', 1),
(153, 27, 1, 2, '', 'сoursework', 1),
(154, 27, 2, 2, '', 'сoursework', 1),
(155, 27, 3, 2, 'no-certif', 'сoursework', 2),
(162, 35, 1, 3, '', '', 1),
(163, 35, 2, 3, '', '', 1),
(164, 35, 3, 3, 'no-certif', 'сoursework', 2),
(165, 34, 2, 2, '', 'сoursework', 1),
(166, 34, 3, 2, 'no-certif', 'сoursework', 2),
(167, 34, 1, 2, '', 'сoursework', 1);

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
  `lectures` int(11) DEFAULT 0,
  `laboratories` int(11) DEFAULT 0,
  `choice` tinyint(1) NOT NULL DEFAULT 0,
  `fixed` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `education_items`
--

INSERT INTO `education_items` (`education_item_id`, `sub_category_id`, `category_id`, `cycles_id`, `education_plans_id`, `subject_id`, `credits`, `lectures`, `laboratories`, `choice`, `fixed`) VALUES
(27, NULL, 1, 1, 10, 2, 5, 10, 12, 0, 1),
(28, NULL, NULL, 4, 10, 1, 5, 0, 0, 0, 1),
(30, NULL, 1, 1, 15, 2, 5, 10, 12, 0, 1),
(31, NULL, NULL, 4, 15, 1, 5, 0, 0, 0, 1),
(34, NULL, 1, 1, 17, 2, 5, 10, 12, 0, 1),
(35, NULL, NULL, 4, 17, 1, 5, 0, 0, 0, 1);

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
  `form_study` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `education_plans`
--

INSERT INTO `education_plans` (`id`, `user_id`, `department_id`, `name`, `status`, `year`, `created_at`, `qualification`, `discipline`, `specialty`, `specialization`, `educational_program`, `educational_level`, `form_study`) VALUES
(10, 1, 1, 'План', 'created', 2019, '2019-06-20 12:00:21', NULL, NULL, NULL, NULL, NULL, '', NULL),
(15, 1, 1, 'План - клон', 'cloned', 2019, '2019-06-20 13:07:10', NULL, NULL, NULL, NULL, NULL, '', NULL),
(17, 3, 1, 'План 2', 'cloned', 2019, '2019-06-21 09:24:27', NULL, NULL, NULL, NULL, NULL, '', NULL),
(20, 1, 1, 'fdfdf2', 'created', 2019, '2019-06-24 08:42:49', 'Магістр', 'dsdsd2', 'sdsds2', 'dsdsd2', 'sdsd2', 'sdsd2', 'sdds2');

-- --------------------------------------------------------

--
-- Структура таблицы `plan_controls`
--

CREATE TABLE `plan_controls` (
  `control_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `module_number` int(11) DEFAULT NULL,
  `hours_week` int(11) NOT NULL DEFAULT 0,
  `exams` int(11) NOT NULL DEFAULT 0,
  `credit` int(11) NOT NULL DEFAULT 0,
  `course_work` int(11) NOT NULL DEFAULT 0,
  `сontrol_work` int(11) NOT NULL DEFAULT 0,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `plan_controls`
--

INSERT INTO `plan_controls` (`control_id`, `id`, `module_number`, `hours_week`, `exams`, `credit`, `course_work`, `сontrol_work`, `semester`) VALUES
(337, 10, 1, 0, 0, 0, 1, 1, 1),
(338, 10, 2, 0, 0, 0, 0, 0, 1),
(339, 10, 3, 0, 0, 0, 0, 0, 2),
(340, 10, 4, 0, 0, 0, 0, 0, 2),
(341, 10, 5, 0, 0, 0, 0, 0, 3),
(342, 10, 6, 0, 0, 0, 0, 0, 3),
(343, 10, 7, 0, 0, 0, 0, 0, 4),
(344, 10, 8, 0, 0, 0, 0, 0, 4),
(345, 10, 9, 0, 0, 0, 0, 0, 5),
(346, 10, 10, 0, 0, 0, 0, 0, 5),
(347, 10, 11, 0, 0, 0, 0, 0, 6),
(348, 10, 12, 0, 0, 0, 0, 0, 6),
(349, 10, 13, 0, 0, 0, 0, 0, 7),
(350, 10, 14, 0, 0, 0, 0, 0, 7),
(351, 10, 15, 0, 0, 0, 0, 0, 8),
(352, 10, 16, 0, 0, 0, 0, 0, 8),
(369, 17, 1, 0, 0, 0, 1, 0, 1),
(370, 17, 2, 0, 0, 0, 0, 0, 1),
(371, 17, 3, 0, 0, 0, 0, 0, 2),
(372, 17, 4, 0, 0, 0, 0, 0, 2),
(373, 17, 5, 0, 0, 0, 0, 0, 3),
(374, 17, 6, 0, 0, 0, 0, 0, 3),
(375, 17, 7, 0, 0, 0, 0, 0, 4),
(376, 17, 8, 0, 0, 0, 0, 0, 4),
(377, 17, 9, 0, 0, 0, 0, 0, 5),
(378, 17, 10, 0, 0, 0, 0, 0, 5),
(379, 17, 11, 0, 0, 0, 0, 0, 6),
(380, 17, 12, 0, 0, 0, 0, 0, 6),
(381, 17, 13, 0, 0, 0, 0, 0, 7),
(382, 17, 14, 0, 0, 0, 0, 0, 7),
(383, 17, 15, 0, 0, 0, 0, 0, 8),
(384, 17, 16, 0, 0, 0, 0, 0, 8),
(385, 17, 1, 0, 0, 0, 1, 0, 1),
(386, 17, 2, 0, 0, 0, 0, 0, 1),
(387, 17, 3, 0, 0, 0, 0, 0, 2),
(388, 17, 4, 0, 0, 0, 0, 0, 2),
(389, 17, 5, 0, 0, 0, 0, 0, 3),
(390, 17, 6, 0, 0, 0, 0, 0, 3),
(391, 17, 7, 0, 0, 0, 0, 0, 4),
(392, 17, 8, 0, 0, 0, 0, 0, 4),
(393, 17, 9, 0, 0, 0, 0, 0, 5),
(394, 17, 10, 0, 0, 0, 0, 0, 5),
(395, 17, 11, 0, 0, 0, 0, 0, 6),
(396, 17, 12, 0, 0, 0, 0, 0, 6),
(397, 17, 13, 0, 0, 0, 0, 0, 7),
(398, 17, 14, 0, 0, 0, 0, 0, 7),
(399, 17, 15, 0, 0, 0, 0, 0, 8),
(400, 17, 16, 0, 0, 0, 0, 0, 8);

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
(1, 0, 'ЕлІТ'),
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
  `credits` int(11) DEFAULT 0
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
-- Структура таблицы `token`
--

CREATE TABLE `token` (
  `id` int(10) NOT NULL,
  `tokenId` varchar(255) NOT NULL,
  `userId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `name`, `surname`, `role`) VALUES
(1, 'test@gmail.com', '$2b$08$zir1xAsXhwL4aMD84ceSL.fdbNZtxnJSGj.pgEzOa2tyDvNxAXp/m', 'Name', 'Surname', 'admin'),
(2, 'test2@gmail.com', '$2b$08$zir1xAsXhwL4aMD84ceSL.fdbNZtxnJSGj.pgEzOa2tyDvNxAXp/m', 'Name2', 'Surname2', 'repres_omu'),
(3, 'test3@gmail.com', '$2b$08$ExevAXWA/f/AAjMPuoEcbOlQaSaH1KLra8q6lBOwq/IGwWjcmSOfm', 'Name3', 'Surname3', 'repres_depart');

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
-- Индексы таблицы `distribution_of_controls`
--
ALTER TABLE `distribution_of_controls`
  ADD PRIMARY KEY (`distribution_of_controls_id`),
  ADD KEY `fk_distribution_of_controls_education_items1_idx` (`education_item_id`);

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
-- Индексы таблицы `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

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
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT для таблицы `distribution_of_controls`
--
ALTER TABLE `distribution_of_controls`
  MODIFY `distribution_of_controls_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  MODIFY `distribution_of_hours_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT для таблицы `education_items`
--
ALTER TABLE `education_items`
  MODIFY `education_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `education_plans`
--
ALTER TABLE `education_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `plan_controls`
--
ALTER TABLE `plan_controls`
  MODIFY `control_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=449;

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
-- AUTO_INCREMENT для таблицы `token`
--
ALTER TABLE `token`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Ограничения внешнего ключа таблицы `distribution_of_controls`
--
ALTER TABLE `distribution_of_controls`
  ADD CONSTRAINT `fk_distribution_of_controls_education_items1` FOREIGN KEY (`education_item_id`) REFERENCES `education_items` (`education_item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
